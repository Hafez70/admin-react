// assets
import { DashboardOutlined } from '@ant-design/icons';
import { PERMISSIONS } from 'constants/permissions';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'menu.navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'menu.dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
      permission: PERMISSIONS.DASHBOARD_VIEW
    }
  ]
};

export default dashboard;
