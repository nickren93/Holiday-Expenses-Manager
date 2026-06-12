import '../styles/Footer.css';
function Footer(){

    return(
        <footer className="footer">
            <div className="footer-section">
                <h3>Links</h3>
                <p>
                    <a href="https://www.booking.com" target="_blank">Booking.com</a><br/>
                    <a href="https://www.kayak.com" target="_blank">Kayak</a><br/>
                    <a href="https://www.expedia.com" target="_blank">Expedia</a>
                </p>
            </div>

            <div className="footer-section">
                <h3>Follow Us</h3>
                <p>
                    <a href="https://www.youtube.com" target="_blank">Youtube</a><br/>
                    <a href="https://www.facebook.com" target="_blank">Facebook</a><br/>
                    <a href="https://www.twitter.com" target="_blank">X</a>
                </p>
            </div>
            <div className="footer-section">
                <h3>Contact</h3>
                <p>
                    email: <a href="mailto:info@xxxxxxxx.com">info@tripledger.com</a><br/>
                    phone: +1 201-556-7789<br/>
                    fax: 201-556-7788
                </p>
            </div>
            <div className="footer-section">
                <h3>Correspondence</h3>
                <address>
                    1 Castle Point<br/>
                    P.O.Box 5555<br/>
                    Hoboken, NJ 07030
                </address>
                <details>
                    <summary>&copy; 2026 TripLedger.</summary>
                    <p>All Rights Reserved.</p>
                </details>
            </div>
        </footer>
    )
}

export default Footer