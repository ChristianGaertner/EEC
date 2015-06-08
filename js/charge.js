var ChargeCalc = React.createClass({
    displayName: 'ChargeCalc',
    getInitialState: function () {
        return {
            value1: "200 V",
            value2: "200 pF",
            value3: "40 nF",
            value4: "4 µJ"
        };
    },
    updateUI: function(digit, node) {
        document
            .getElementById('svg_charge')
            .getSVGDocument()
            .getElementById('display_value' + digit)
            .textContent = node.options[node.selectedIndex].text;
    },
    handleChange: function() {
        var v1 = React.findDOMNode(this.refs.value1);
        var v2 = React.findDOMNode(this.refs.value2);
        var v3 = React.findDOMNode(this.refs.value3);
        var v4 = React.findDOMNode(this.refs.value4);

        this.setState({
            value1: v1.value,
            value2: v2.value,
            value3: v3.value,
            value4: v4.value
        });

        // updateUI
        this.updateUI('1', v1);
        this.updateUI('2', v2);
        this.updateUI('3', v3);
        this.updateUI('4', v4);
    },
    render: function () {
        return (
            <div>
                <h5>Cooming soon!</h5>
                Voltage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(U):
                &nbsp;<input ref="value1" type="text" placeholder="200V" />
                <br />
                Capacitance&nbsp;(C):
                &nbsp;<input ref="value2" type="text" placeholder="200pF"/>
            </div>
        )
    }
});

React.render(<ChargeCalc />, document.getElementById('charge'));