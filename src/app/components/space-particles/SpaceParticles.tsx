'use client'
import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadAll } from '@tsparticles/all'
import { type Container, type ISourceOptions, MoveDirection, OutMode } from '@tsparticles/engine'

const SpaceParticles = () => {
    const [init, setInit] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadAll(engine)
        }).then(() => setInit(true))
    }, [])

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container)
    }

    const options: ISourceOptions = useMemo(
        () => ({
        background: {
            color: {
            value: "var(--color-background)",   
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
            // onClick: {
            //     enable: true,
            //     mode: "push",
            // },
            // onHover: {
            //     enable: true,
            //     mode: "repulse",
            // },
            },
            modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            },
        },
        particles: {
            color: {
                value: "#607D8B",
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.4,
            width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out",
                },
                random: false,
                speed: 5,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 200,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
        }),
        [],
    );
    
    if (init) {
        return (
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={options}
                />
        );
    }
    
    return <></>;
}

export default SpaceParticles