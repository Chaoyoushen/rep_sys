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
	hisWash() {
	    return Request().post('/wash/washHis', {
	        header: {
	            contentType: 'application/json'
	        }
	    });
	},
	washHisDetail(data ) {
	    return Request().post('/wash/washDetail', {
	        header: {
	            contentType: 'application/json'
	        },
			data: data
	    });
	},
	CancelWash(data) {
	    return Request().post('/wash/washCancel', {
	        header: {
	            contentType: 'application/json'
	        },
			data: data
	    });
	},
	restAmount()
	{
	return Request().post('/wash/restAmount', {
	    header: {
	        contentType: 'application/json'
	    }
	});	
	},
	initwashAmount()
	{
	return Request().post('/wash/initwashAmount', {
	    header: {
	        contentType: 'application/json'
	    }
	});	
	}
};
