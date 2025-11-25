import '../styles/Footer.css';
function Footer(){

    return(
        <footer className="footer">
            <div className="footer-section">
                <h3>Links</h3>
                <p>
                    <a href="#" target="_blank">Booking.com</a><br/>
                    <a href="#" target="_blank">Kayak</a><br/>
                    <a href="#" target="_blank">Expedia</a>
                </p>
            </div>

            <div className="footer-section">
                <h3>Follow Us</h3>
                <p>
                    <a href="#" target="_blank">Youtube</a><br/>
                    <a href="#" target="_blank">Facebook</a><br/>
                    <a href="#" target="_blank">Twitter</a>
                </p>
            </div>
            <div className="footer-section">
                <h3>Contact</h3>
                <p>
                    email: <a href="mailto:info@xxxxxxxx.com">info@xxxxxxxx.com</a><br/>
                    phone: +1 xxx xxx xxxx<br/>
                    fax: xxx-xxx-xxxx
                </p>
            </div>
            <div className="footer-section">
                <h3>Correspondence</h3>
                <address>
                    xxxxxxxxx<br/>
                    P.O.Box 5555<br/>
                    Brooklyn, NY 11201
                </address>
                <details>
                    <summary>&copy; 2025 Holiday Expenses Manager.</summary>
                    <p>All Rights Reserved.</p>
                </details>
            </div>
        </footer>
    )
}

export default Footer