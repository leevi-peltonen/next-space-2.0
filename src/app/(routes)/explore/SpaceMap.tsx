'use client'
import { Character, Planet } from "@prisma/client"
import { useEffect, useReducer, useRef, useState } from "react"
import React, { FC } from 'react';
import { Stage, Sprite, Container } from '@pixi/react';
import * as PIXI from 'pixi.js';


interface SpaceMapProps {
    planets: Planet[]
    character: Character
    onMoveEnd: (position: {x: number, y: number}, planetsInRange: number[]) => void
}


export default function SpaceMap ({planets, character, onMoveEnd}: SpaceMapProps) {

    
    const width = 1200;
    const height = 800;

    const fogTileTexture = PIXI.Texture.WHITE; // Replace with your fog tile texture
    const fogTileWidth = 100;
    const fogTileHeight = 100;
    // Render the fog tiles
    const fogTiles = [];
    for (let x = 0; x < width; x += fogTileWidth) {
        for (let y = 0; y < height; y += fogTileHeight) {


            const distance = Math.sqrt(
                (x - character.location[0]) ** 2 + (y - character.location[1]) ** 2
              );
              const isHidden = distance < 200;
              


            const fogTile = {
                texture: fogTileTexture,
                x: x,
                y: y,
                size: 100,
                isHidden: isHidden
            };
            fogTiles.push(fogTile);
        }
    }
    const findPlanetsInView = () => {
        return planets.filter(planet => planet.isInRange).map(planet => ({x: planet.coordinates[0], y: planet.coordinates[1]}))
    }

    const convertToPlanetsInView = (discoveredPlanets: {x: number, y: number}[]): number[] => {
        console.log(discoveredPlanets)
        const planetIdsInView = planets.filter(planet => {
            return discoveredPlanets.find(discoveredPlanet => {
                return discoveredPlanet.x === planet.coordinates[0] && discoveredPlanet.y === planet.coordinates[1]
            })
        })
        
        console.log(planetIdsInView)
        return planetIdsInView.map(planet => planet.id)
    }
    
    return (
        <div className="w-full h-full">
            <GameMap
                fogTiles={fogTiles}
                width={width} height={height} 
                playerPosition={{x: character.location[0], y: character.location[1]}} 
                planets={planets.map(planet => ({x: planet.coordinates[0], y: planet.coordinates[1]}))}
                speed={character.travelSpeed/* / 10*/}
                onMoveEnd={(position, planetsInRange) => onMoveEnd(position, convertToPlanetsInView(planetsInRange))}
                planetsInView={findPlanetsInView()}
            />
        </div>
    )
}




interface GameMapProps {
    fogTiles: { texture: PIXI.Texture; x: number; y: number, size: number, isHidden: boolean }[];
    width: number;
    height: number;
    playerPosition: { x: number; y: number };
    planets: { x: number; y: number }[];
    planetsInView: { x: number; y: number }[];
    speed: number
    onMoveEnd: (position: {x: number, y: number}, planetsInRange: { x: number; y: number }[]) => void
}




const GameMap: FC<GameMapProps> = ({
    fogTiles,
    width,
    height,
    playerPosition,
    planets,
    speed,
    onMoveEnd,
    planetsInView
  }) => {

    
    
    const [charPos, setCharPos] = useState(playerPosition)
    const [isMoving, setIsMoving] = useState(false);
    const [movementTarget, setMovementTarget] = useState<{ x: number; y: number } | null>(null);
    const [fog, setFog] = useState(fogTiles)
    useEffect(() => {

        fogTiles.forEach((fogTile) => {
            const distance = Math.sqrt(
              (fogTile.x - charPos.x) ** 2 + (fogTile.y - charPos.y) ** 2
            );
            const isHidden = distance < 200;
            fogTile.isHidden = isHidden;
          });
        setFog(fogTiles)
    }, [])

   

    

    useEffect(() => {
        if (movementTarget) {
          setIsMoving(true);
      
          // Calculate the direction and distance to the target
          const directionX = movementTarget.x - playerPosition.x;
          const directionY = movementTarget.y - playerPosition.y;
          const distance = Math.sqrt(directionX ** 2 + directionY ** 2);
      
          // Calculate the normalized movement vector
          const normalizedDirectionX = directionX / distance;
          const normalizedDirectionY = directionY / distance;
      
          // Initialize variables for animation
          let remainingDistance = distance;
          let currentX = playerPosition.x;
          let currentY = playerPosition.y;
      
          // Update the player's position with animation
          const updatePosition = () => {
            if (!isMoving) return;
      
            const moveDistance = speed;
      
            // Check if the remaining distance is less than the move distance
            if (remainingDistance < moveDistance) {
                setIsMoving(false);
                setCharPos(movementTarget);
                setMovementTarget(null);
                onMoveEnd(movementTarget, findPlanetsInView(movementTarget))
                return;
            }
      
            // Calculate the next position
            currentX += normalizedDirectionX * moveDistance;
            currentY += normalizedDirectionY * moveDistance;
      
            setCharPos({ x: currentX, y: currentY });

            // Update the fogTiles hidden based on the player's position
            fogTiles.forEach((fogTile) => {
              const distance = Math.sqrt(
                (fogTile.x - currentX) ** 2 + (fogTile.y - currentY) ** 2
              );
              const isHidden = distance < 200;
              fogTile.isHidden = isHidden;
            });
            setFog(fogTiles)


            // Update the remaining distance
            remainingDistance -= moveDistance;
      
            requestAnimationFrame(updatePosition);
          };
      
          requestAnimationFrame(updatePosition);
        }
      }, [isMoving, movementTarget, playerPosition]);

      const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!movementTarget) {
          // Calculate the target position based on the click
          const targetX = event.nativeEvent.offsetX;
          const targetY = event.nativeEvent.offsetY;
    
          // Ask the player to confirm the move
          const confirmMove = window.confirm(`Move to (${targetX}, ${targetY})?`);
          
          if (confirmMove) {
            // Set the movement target
            setMovementTarget({ x: targetX, y: targetY });
          }
        }
      };

    const findPlanetsInView = (pos: {x: number, y:number}) => {
        
        const discoveredPlanets = planets.filter((planet) => {
            const distance = Math.sqrt(
              (planet.x - pos.x) ** 2 + (planet.y - pos.y) ** 2
            );
            return distance < 200;
          });
        return discoveredPlanets;
    }

    return (
      <Stage width={width} height={height} options={{ backgroundColor: 0x000000 }} onClick={handleCanvasClick}>
        <Container>
          {/* Render your game elements here */}
          
          {/* Render discovered planets */}
          {planets.map((planet, index) => (
            <Sprite
              key={index}
              texture={PIXI.Texture.from('next-space.png')} // Replace with your planet texture
              width={50}
                height={50}
              x={planet.x}
              y={planet.y}
              anchor={new PIXI.Point(0.5, 0.5)}
            />
          ))}
  
          {/* Render fog of war */}
          {fog.map((fogTile, index) => {
            return (
              <Sprite
                key={index}
                texture={fogTile.isHidden ? PIXI.Texture.EMPTY : fogTile.texture}
                width={fogTile.size}
                height={fogTile.size}
                x={fogTile.x}
                y={fogTile.y}
                anchor={new PIXI.Point(0.5, 0.5)}
              />
            );
          })}
  
          {/* Render the player */}
          <Sprite
            texture={PIXI.Texture.from('space-home.png')} // Replace with your player texture
            width={50}
            height={50}
            x={charPos.x}
            y={charPos.y}
            anchor={new PIXI.Point(0.5, 0.5)}
          />
        </Container>
      </Stage>
    );
  };