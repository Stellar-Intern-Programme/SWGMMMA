import {PermissionsAndroid} from 'react-native';

const requestExternalStoragePermission = async (cb: any) => {
  try {
    const grantedGallery = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Gallery Permission',
        message: 'App needs access to your photos',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (grantedGallery === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission given');
      cb();
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default requestExternalStoragePermission;
