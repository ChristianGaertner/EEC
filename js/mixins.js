var SelectHelper = {
	createOption: function(db, type, value) {
		return <option value={ db[type][value] }>{ value }</option>
	},
	createList: function(db, type) {
		var list = [];
		for (var value in db[type]) {
			list.push(this.createOption(db, type, value));
		}
		return list;
	},
};

var ValueCalculator = {
	calcValue: function(v1, v2, v3) {
		var value = (v1 * 10 + parseFloat(v2)) * v3;
        return Math.round(value * 1000) / 1000;
	}
};

var ComponentRenderer = {
	basicRender: function(itemSelector, value, tolerance, unit) {
		return (
			<div>
                { itemSelector }
                <p>
                    <h5 className="inline">
                        { value }{ unit }
                    </h5>
                    <h6 className="inline">
                        &nbsp;w/ &plusmn;{ tolerance }% tolerance.
                    </h6>  
                </p>
            </div>
		)
	}
};