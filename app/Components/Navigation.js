import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">HOME</Link>
        </li>
        <li>
          <Link href="/OrderPage">ORDER</Link>
        </li>
        <li>
          <Link href="/AllStatsPage">STATS</Link>
        </li>
        <li>
          <Link href="/EditProduct">EDIT</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;