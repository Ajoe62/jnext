import Link from 'next/link';
import { FaGithub, FaLinkedin, FaYoutube, FaTwitter } from 'react-icons/fa';

const socials = [
    { icon: <FaGithub />, path: 'https://github.com/Ajoe62' },
    { icon: <FaLinkedin />, path: 'https://linkedin.com/in/akharmejoseph' },
    { icon: <FaYoutube />, path: 'https://youtube.com/@ypnconnect-soft5154' },
    { icon: <FaTwitter />, path: 'https://x.com/Web_with_Joet=lt7GxE3G77huQXLNysNpZg&s=09' },
];

const Social = ({ containerStyles, iconStyles }) => {
    return (
        <div className={containerStyles}>
            {socials.map((item, index) => {
                return (
                    <Link key={index} href={item.path} target="_blank" rel="noopener noreferrer" className={iconStyles}>
                        {item.icon}
                    </Link>
                );
            })}
        </div>
    );
};

export default Social;