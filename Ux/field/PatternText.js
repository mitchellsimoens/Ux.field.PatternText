Ext.define('Ux.field.PatternText', {
    extend : 'Ext.field.Text',
    xtype  : 'patterntextfield',

    config : {
        /**
         * The value to set as the pattern attribute to the <input> element
         * @cfg {String} pattern
         */
        pattern    : null,
        /**
         * The RegExp string to validate keys
         * @cfg {String/RegExp} regexp
         */
        regexp     : null,
        /**
         * An array of key codes that are allowed
         * @cfg {Array} allowCodes
         */
        allowCodes : [8, 37, 38, 39, 40, 46]
    },

    initialize : function() {
        var me = this;

        me.callParent();

        var component = me.getComponent();

        component.input.on({
            scope   : me,
            keydown : 'onKeyDown'
        });
    },

    updatePattern : function(pattern) {
        var component = this.getComponent();

        component.updateFieldAttribute('pattern', pattern);
    },

    applyRegexp: function(regexp) {
        if (typeof regexp === 'string') {
            regexp = new RegExp(regexp);
        }

        return regexp;
    },

    onKeyDown : function(e) {
        var me         = this,
            code       = e.browserEvent.keyCode,
            key        = String.fromCharCode(code),
            regexp     = me.getRegexp() || me.getPattern(),
            allowCodes = me.getAllowCodes();

        if (allowCodes.indexOf(code) === -1 && !regexp.test(key)) {
            e.stopEvent();
        }
    }
});