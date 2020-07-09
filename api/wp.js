import Request from '../common/request/js/index';

export default {
    createWash(data) {
        return Request().post('/wash/create', {
            header: {
                contentType: 'application/json'
            },
            data: data
        });
    },
};
