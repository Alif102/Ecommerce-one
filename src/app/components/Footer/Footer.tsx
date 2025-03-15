// components/Footer.tsx
import { Layout, Row, Col, Space } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="bg-gray-800 text-white py-12">
      <Row gutter={[16, 16]} className=" mx-auto">
        <Col xs={24} sm={12} md={6}>
          <h2 className="text-xl font-bold mb-4">Company</h2>
          <ul>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/careers" className="hover:underline">Careers</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul>
            <li><Link href="/shop" className="hover:underline">Shop</Link></li>
            <li><Link href="/cart" className="hover:underline">Cart</Link></li>
            <li><Link href="/checkout" className="hover:underline">Checkout</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h2 className="text-xl font-bold mb-4">Contact</h2>
          <p>123 E-Commerce St., Suite 101</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: support@yourstore.com</p>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <Space size="large">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined className="text-2xl hover:text-blue-600" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined className="text-2xl hover:text-pink-600" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined className="text-2xl hover:text-blue-400" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <YoutubeOutlined className="text-2xl hover:text-red-600" />
            </a>
          </Space>
        </Col>
      </Row>

      <div className="mt-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Your E-Commerce Store. All rights reserved.</p>
      </div>
    </Footer>
  );
};

export default FooterComponent;
