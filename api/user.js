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
	},
	verifyToken(data) {
	    if(data.code===501&&data.data===2001){
	    	uni.showToast({
	    		title:'登录过期',
				success: () => {
					uni.removeStorageSync('token')
					uni.removeStorageSync('role')
					uni.reLaunch({
						url:'/pages/login/login.vue'
					})
				}
	    	})
			return
	    }
	}
};
