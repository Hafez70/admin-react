// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'menu.support',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'menu.samplePage',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined
    },
    {
      id: 'documentation',
      title: 'menu.documentation',
      type: 'item',
      url: 'https://github.com/Hafez70',
      icon: icons.QuestionOutlined,
      external: true,
      target: true
    }
  ]
};

export default support;
