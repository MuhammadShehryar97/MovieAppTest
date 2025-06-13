import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';

import { TabScreens } from '../../constants/screens.constants';
import Colors from '../../constants/styles/colors';

interface BottomTabIconProps {
  tab: TabScreens;
  isActive?: boolean;
}

const BottomTabIcon: React.FC<BottomTabIconProps> = ({
  tab,
  isActive,
}) => {
  const styles = StyleSheet.create({
    icon: {
      width: tab == TabScreens.MORE ? 28 : 18,
      height: tab == TabScreens.MORE ? 28 : 18,
      tintColor: isActive ? Colors.basic.white : Colors.basic.gray,
    },
  });

  const getIcon = () => {
    switch (tab) {
      case TabScreens.DASHBOARD:
        return <Image source={require('../../../assets/icons/dashboard-icon.png')} style={styles.icon} />;
      case TabScreens.WATCH:
        return <Image source={require('../../../assets/icons/watch-icon.png')} style={styles.icon} />;
      case TabScreens.MEDIA_LIBRARY:
        return <Image source={require('../../../assets/icons/media-icon.png')} style={styles.icon} />;
      case TabScreens.MORE:
        return <Image source={require('../../../assets/icons/more-icon.png')} style={styles.icon} />;
      default:
        return <Image source={require('../../../assets/icons/dashboard-icon.png')} style={styles.icon} />;
    }
  };

  return getIcon();
};

export default React.memo(BottomTabIcon);
