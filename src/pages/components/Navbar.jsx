import '../../assets/css/Navbar.css'

export const Navbar = () => {
    return (
        <nav className="navbar">
            <a className='brand-a'>
                <h1 className="brand">Medical Appointments</h1>
            </a>
            <div className="nav-links">
                <a href="#" className="link">Home</a>
                <a href="#" className="link">Contact</a>
            </div>
        </nav>
    )
}
