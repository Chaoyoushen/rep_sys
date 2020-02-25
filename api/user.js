import Request from '../common/request/js/index';

export default {
    login(data) {
        return Request().post('/user/login', {
            header: {
                contentType: 'application/json'
            },
            data: data
        });
    },
	
	logout() {
	    return Request().post('/user/logout', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	},
	
	getUserInfo() {
	    return Request().post('/user/getUserInfo', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	},
};
