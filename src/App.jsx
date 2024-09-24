import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolsAllowed, setSymbolsAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const inputRef = useRef(null)
  const generatePassword = useCallback(() => {
    let p = ''
    let s = 'abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (numberAllowed) s += '0123456789'
    if (symbolsAllowed) s += '!@#$%^&*()_+'
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * s.length + 1)
      p += s.charAt(char)
    }
    setPassword(p)
  }, [length, numberAllowed, symbolsAllowed])
  const copy = () => {
    window.navigator.clipboard.writeText(password)
    inputRef.current?.select()
  }
  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, symbolsAllowed])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white my-3 text-center'>
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' ref={inputRef} readOnly />
        <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0' onClick={copy}>
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" name="" id="" min={8} max={100} value={length} className='cursor-pointer' onChange={e => setLength(e.target.value)} />
          <label htmlFor="length">
            Length: {length}
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" name="" id="" defaultChecked={numberAllowed} onChange={() => setNumberAllowed(p => !p)} />
          <label htmlFor="number">
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" name="" id="" defaultChecked={symbolsAllowed} onChange={() => setSymbolsAllowed(p => !p)} />
          <label htmlFor="symbolsInput">
            Special Symbols
          </label>
        </div>
      </div>
    </div >
  )
}

export default App