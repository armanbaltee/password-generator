import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllwoed] = useState(false)
  const passwordRef = useRef(null)

  const passwordGeneratoe = useCallback(()=>{
    let pass =""
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"

    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += ",./\|<>?:'[]{}~!@#$%^&*()_+-"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    } 
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect( () => {
    passwordGeneratoe()
  },[length, numberAllowed, charAllowed, passwordGeneratoe])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-800 bg-gray-700'>
        <h1 className='text-white text-lg flex justify-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPassword}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="Range"
            min={8}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length {length}</label>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={()=>{
                setNumberAllowed((prev)=>!prev);
              }} 
              />
              <label>Number</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={()=>{
                setCharAllwoed((prev)=>!prev);
              }} />
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
