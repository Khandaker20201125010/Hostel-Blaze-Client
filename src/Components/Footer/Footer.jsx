import lo from '../../assets/images/logo.png'

const Footer = () => {
    return (
        <div>
            <footer className="mt-20 footer p-10 bg-base-200 text-base-content bg-gradient-to-r from-blue-950 to-black hover:bg-blue-800">
                <aside>
                   <img className=' h-20' src={lo} alt="" />
                    <p className='text-white'>ACME Industries Ltd.<br />Providing reliable tech since 1992</p>
                </aside>
                <nav className='text-white'>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav className='text-white'>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav className='text-white'>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>

        </div>
    );
};

export default Footer;