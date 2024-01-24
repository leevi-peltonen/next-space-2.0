'use client'
import { Planet } from "@prisma/client"
import { Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { isOnPlanet, getDistance } from "@/app/utils/game"
import toast from "react-hot-toast"

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
        children: (
            <Text size="sm">
                {planet.name} is {distance} light years away from your current location <br /> It will take you {time} seconds to travel there
            </Text>
        ),
        labels: {
            confirm: 'Yes',
            cancel: 'No'
        },
        onConfirm: () => travelToPlanet(planet.id),
        onClose: () => console.log('closed')
   
    })

    

    return (
        <div
            className="bg-background rounded-xl m-10 p-10 hover:cursor-pointer hover:bg-gray-700"
            onClick={handleClick}
        >
            <h1>{planet.name}</h1>
            <h2>Tier: {planet.tier}</h2>
        </div>
    )
}

export default PlanetBox