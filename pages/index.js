import Image from "next/image";

function Home() {
    return (
        <>
            <h1>Eu amo minha família!!! ❤️❤️❤️ </h1>
            <Image
                src="/images/hot_park.jpg"
                alt="Família no Hot Park"
                width={544}
                height={327}
            />    
            
        </>
    )
}

export default Home;