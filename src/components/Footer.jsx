import { foot } from '../data/states/goa.js';
import LegacyMarkup from './LegacyMarkup.jsx';

export default function Footer({ html = foot() }) {
  return <LegacyMarkup html={html} />;
}
