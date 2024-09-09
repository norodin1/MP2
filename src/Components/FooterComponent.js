import { Container } from "react-bootstrap";
import "./FooterComponent.css";

export const FooterComponent = () => {
  return (
    <footer variant="warning" className="page-footer pt-4 mt-5">
      <Container className="d-flex justify-content-center">
        <ul className="list-unstyled row">
          <li className="col">
            <a href="https://github.com/norodin1">
              <i className="bi bi-github"></i>
            </a>
          </li>
          <li className="col">
            <a
              href="https://www.facebook.com/norodin.amatonding"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook"></i>
            </a>
          </li>
          <li className="col">
            <a href="https://www.instagram.com/">
              <i className="bi bi-instagram"></i>
            </a>
          </li>
          <li className="col">
            <a href="https://www.linkedin.com/">
              <i className="bi bi-linkedin"></i>
            </a>
          </li>
        </ul>
      </Container>

      <Container className="footer-copyright text-center py-3">
        <p>Copyright &copy; 2024 | Norodin WD103P</p>
      </Container>
    </footer>
  );
};
