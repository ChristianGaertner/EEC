var TypeEnum = {
    SIG_FIGURE: 'sig_figure',
    MULTIPLIER: 'multiplier',
    TOLERANCE: 'tolerance'
}

var ColorCodes = {
    'sig_figure': {
        'black': 0,
        'brown': 1,
        'red': 2,
        'orange': 3,
        'yellow': 4,
        'green': 5,
        'blue': 6,
        'violet': 7,
        'gray': 8,
        'white': 9
    },
    'multiplier': {
        'black': 1,
        'brown': 10,
        'red': 100,
        'orange': 1000,
        'yellow': 10000,
        'green': 100000,
        'blue': 100000,
        'violet': 1000000,
        'gray': 10000000,
        'white': 100000000,
        'gold': 0.1,
        'silver': 0.2
    },
    'tolerance': {
        'brown': 0.01,
        'red': 0.02,
        'yellow': 0.05,
        'green': 0.005,
        'blue': 0.0025,
        'violet': 0.001,
        'gray': 0.1,
        'gold': 0.05,
        'silver': 0.1,
        'none': 0.2
    }
}

var ResistorCalc = React.createClass({
    displayName: 'ResistorCalc',
    getInitialState: function () {
        return {
            ring1: 0,
            ring2: 0,
            ring3: 0,
            ring4: 0.01,
            listVisible: false
        };
    },
    updateRectColor: function(ring, node) {
        document
            .getElementById('svg_resistor')
            .getSVGDocument()
            .getElementById('display_ring' + ring)
            .style.fill = node.options[node.selectedIndex].text;
    },
    handleChange: function() {
        var r1 = React.findDOMNode(this.refs.ring1);
        var r2 = React.findDOMNode(this.refs.ring2);
        var r3 = React.findDOMNode(this.refs.ring3);
        var r4 = React.findDOMNode(this.refs.ring4);
        // update state
        this.setState({
            ring1: r1.value,
            ring2: r2.value,
            ring3: r3.value,
            ring4: r4.value
        });

        // update UI
        this.updateRectColor(1, r1);
        this.updateRectColor(2, r2);
        this.updateRectColor(3, r3);
        this.updateRectColor(4, r4);

    },
    getValue: function(type, color) {
        return ColorCodes[type][color];
    },
    getResistance: function() {
        var ohms = (this.state.ring1 * 10 + parseFloat(this.state.ring2)) * this.state.ring3;
        ohms = Math.round(ohms * 1000) / 1000;

        if (ohms >= 1000000000) {
            return ohms / 1000000000 + "G";
        }

        if (ohms >= 1000000) {
            return ohms / 1000000 + "M";
        }

        if (ohms >= 1000) {
            return ohms / 1000 + "k";
        }

        return ohms
    },
    getTolerance: function() {
        return this.state.ring4 * 100;
    },
    render: function () {
        return (
            <div>
                { this.renderItems() }
                <p>
                    <h5 className="inline">
                        { this.getResistance() }&#8486;   
                    </h5>
                    <h6 className="inline">
                        &nbsp;w/ &plusmn;{ this.getTolerance() }% tolerance.
                    </h6>  
                </p>
            </div>
        );
    },
    renderItems: function() {
        var createOption = function(type, color) {
            return <option value={ ColorCodes[type][color] }>{ color }</option>
        };

        var createList = function(type) {
            var list = [];
            for (var color in ColorCodes[type]) {
                list.push(createOption(type, color))
            }
            return list;
        };

        return (
            <div class="selection">
                <select ref="ring1" onChange={ this.handleChange }>{ createList(TypeEnum.SIG_FIGURE) }</select>
                <select ref="ring2" onChange={ this.handleChange }>{ createList(TypeEnum.SIG_FIGURE) }</select>
                <select ref="ring3" onChange={ this.handleChange }>{ createList(TypeEnum.MULTIPLIER) }</select>
                <select ref="ring4" onChange={ this.handleChange }>{ createList(TypeEnum.TOLERANCE) }</select>
            </div>
        )
    }
});

React.render(<ResistorCalc />, document.getElementById('resistor'));