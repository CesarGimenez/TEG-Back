import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../constants/constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dl57f2zr5',
      api_key: '151489194133778',
      api_secret: 'rJ0DxA1Lpbl6v5FZT1flVTRIrjg',
    });
  },
};
