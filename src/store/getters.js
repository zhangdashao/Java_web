export const getMenu = state => state.sideMenu;
export const getRole = state => (state.role_code === '1003' ? 'user' : 'admin');
