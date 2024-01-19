import SpaceContainer from "./components/space-container/SpaceContainer";


export default function Home() {
  return (
    <SpaceContainer>
        <div>
            <img src="/next-space.png" alt="logo" className="w-32 h-32 mx-auto"/>
            <h1 className="text-4xl font-bold text-white tracking-wider">NEXT SPACE 2.0</h1>
        </div>
        
    </SpaceContainer>
  )
}
