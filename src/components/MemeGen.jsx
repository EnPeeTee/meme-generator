import { useEffect, useState } from "react"

const MemeGen = () => {
    const [ allMemes, setAllMemes] = useState([])

    useEffect( 
        () => {
            fetch("https://api.imgflip.com/get_memes")
                .then( res => res.json())
                .then( data => setAllMemes(data.data.memes))
        }, []
    )

    function getURL() {
        const rng = Math.floor (Math.random() * allMemes.length)
        const urlData = allMemes[rng].url
        return urlData
    }
    
    const [ memeGen, setMemeGen ] = useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    })
    
    function getRandomMeme() {
        setMemeGen(prevMeme => ({
            ...prevMeme,
            randomImage: getURL()
        }))
    }

    function handleChange(e) {
        const {name, value} = e.target
        setMemeGen(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    return (
    <main>
        <div className="form-meme">
            <input
                className="input-top" 
                type="text"
                placeholder="Top Text" 
                name="topText"
                value={memeGen.topText}
                onChange={handleChange}
            />
            <input 
                className="input-bottom"
                type="text"
                placeholder="Bottom Text" 
                name="bottomText"
                value={memeGen.bottomText}
                onChange={handleChange}
            />
            <button 
                className="input-generate" 
                onClick={getRandomMeme}
            >
                Get a new meme image 🖼
            </button>
        </div>
        <div className="meme">
            <img
                className="meme-img" 
                src={memeGen.randomImage}
            />
            <h2 className="meme-text top">{memeGen.topText}</h2>
            <h2 className="meme-text bottom">{memeGen.bottomText}</h2>
        </div>
    </main>
)}

export default MemeGen