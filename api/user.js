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
	
	feedback(data) {
	    return Request().post('/feedback/makeFeedback', {
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
	    return Request().post('/user/getWxUserInfo', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	},
	changeWxUserInfo(data) {
	    return Request().post('/user/changeWxUserInfo', {
	        header: {
	            contentType: 'application/json'
	        },
			data:data
	    });
	},
	searchOrg(data) {
	    return Request().post('/user/getOrgList', {
	        header: {
	            contentType: 'application/json'
	        },
			data:data
	    });
	}
};
