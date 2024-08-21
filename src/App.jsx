import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumber] = useState(false)
  const [charactorAllow, setCharactor] = useState(false)
  const [password, setPassword] = useState("")

  const copyRefernce = useRef();


  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) {
      str += "1234567890"
    }
    if (charactorAllow) {
      str += "~!@#$%^&*_+-="
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllow, charactorAllow, setPassword])

  const handleCopy = (e)=>{
    copyRefernce.current?.select()
    window.navigator.clipboard.writeText(password)
    // e.target.style.background = "green";
    
  }

  useEffect(()=>{
    passGenerator()
  },[length,numberAllow,charactorAllow])



  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-4xl text-center text-white my-3">PasswordGenerator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-5">
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={copyRefernce}/>
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"  onClick={handleCopy}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1' >
            <input type="range" min={6} max={32} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label htmlFor="">Length :{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllow} id='numberInput' onChange={()=>{setNumber(!numberAllow)}}  />
            <label htmlFor="">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charactorAllow} id='charInput' onChange={()=>{setCharactor(!charactorAllow)}}  />
            <label htmlFor="">Special Charactor</label>
          </div>

        </div>

      </div>

    </>
  )
}

export default App
