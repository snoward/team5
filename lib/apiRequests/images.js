import axios from 'axios';

export function uploadImage(file) {
    /* eslint-disable-next-line */
    const formData = new FormData();
    formData.append('image', file);

    const options = {
        url: '/api/images/',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData,
        withCredentials: true,
        validateStatus: () => true
    };

    return axios(options);
}
