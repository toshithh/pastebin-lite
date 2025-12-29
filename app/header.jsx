"use client";

export default function Header() {
    return (
    <div className='header'>
        <h1 className="clickable" onClick={() => window.location.href="/"}>Pastebin-Lite</h1>
        <h3 className="clickable" onClick={() => window.open("https://toshith.in")}>Toshith Yadav</h3>
    </div>
    )
}