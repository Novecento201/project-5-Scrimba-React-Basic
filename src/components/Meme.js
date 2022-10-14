import {useState, useEffect} from "react"
const Meme = () => {
    
    const [meme,setMeme] = useState({
        topText : "",
        bottomText : "",
        randomImage : "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        const getMemes = async() => {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    const getMemeImage = () => {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                randomImage : url
            }
        })
    }

    const handleChange = (event) => {
        const {name,value} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name] : value
            }
        })
    }

    return ( 
        <div className="meme">
            <div className="form">
                <div className="input-container">
                    <input 
                        type="text" 
                        className="form-input"
                        placeholder="Top text"
                        onChange={handleChange}
                        name="topText"
                        value={meme.topText}
                        
                    />
                    <input 
                        type="text" 
                        className="form-input"
                        placeholder="Bottom text"
                        onChange={handleChange}
                        name="bottomText"
                        value={meme.bottomText}
                        
                    />
                </div>
                <button 
                    onClick={getMemeImage}
                    className="form-button"
                > Get a new meme image</button>
            </div>
            <div className="meme-container">
                <img src={meme.randomImage} className="meme--image" alt=""/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </div>
     );
}
 
export default Meme;