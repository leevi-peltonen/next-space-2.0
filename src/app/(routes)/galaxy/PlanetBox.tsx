'use client'
import { Planet } from "@prisma/client"
import { Progress, Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { isOnPlanet, getDistance } from "@/app/utils/game"
import toast from "react-hot-toast"
import ProgressBar from "./ProgressBar"

interface PlanetBoxProps {
    planet: Planet
    travelToPlanet: (planetId: number) => void
    currentLocation: number[]
    speed: number
}

const PlanetBox = ({planet, travelToPlanet, currentLocation, speed}: PlanetBoxProps) => {

 
    const distance = getDistance(planet.coordinates, currentLocation)
    const time = distance / speed
    const handleClick = () => {
        if(isOnPlanet(planet, currentLocation)) return toast.error('You are already on this planet')
        openModal()
    }
    


    const openModal = () => modals.openConfirmModal({
        title: `Are you sure you want to travel to ${planet.name}?`,
        size: 'sm',
        radius: 'md',
        withCloseButton: false,
        centered: true,
        styles: {
            body: {
                backgroundColor: '#5587a0',
                padding: 20,
                color: 'white'
            },
            header: {
                backgroundColor: '#3c96df94',
            }
        },
        overlayProps: {
            backgroundOpacity: 0.55,
            blur: 3
        },
        children: (
            <Text size="sm">
                {planet.name} is {distance} light years away from your current location <br /> It will take you {time} seconds to travel there
            </Text>
        ),
        labels: {
            confirm: 'Yes',
            cancel: 'No'
        },
        onConfirm: () => openProgressModal(),
        onClose: () => console.log('closed')
   
    })

    const openProgressModal = () => modals.open({
        title: `Travelling to ${planet.name}`,
        size: 'sm',
        radius: 'md',
        withCloseButton: false,
        centered: true,
        closeOnClickOutside: false,
        closeOnEscape: false,
        styles: {
            body: {
                backgroundColor: '#5587a0',
                padding: 20,
                color: 'white'
            },
            header: {
                backgroundColor: '#3c96df94',
            }
        },
        overlayProps: {
            backgroundOpacity: 0.55,
            blur: 3
        },
        children: (
            <div>
                <ProgressBar 
                    duration={time} 
                    onComplete={handleTravelEnd} />
            </div>
        )
    })

    
    const handleTravelEnd = () => {
        modals.closeAll()
        travelToPlanet(planet.id)
        toast.success(`You have arrived at ${planet.name}`)
    }

    return (
        <div
            className={`${isOnPlanet(planet, currentLocation) ? 'bg-primary' : 'bg-background'} rounded-xl m-10 p-10 hover:cursor-pointer hover:bg-gray-700`}
            onClick={handleClick}
        >
            <h1>{planet.name}</h1>
            <h2>Tier: {planet.tier}</h2>
        </div>
    )
}

export default PlanetBox