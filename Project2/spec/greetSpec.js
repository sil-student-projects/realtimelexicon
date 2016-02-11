'use strict';
//./node_modules/jasmine-node/bin/jasmine-node spec/greetSpec.js

var greet = require('../src/greet'); 

describe('greet', function() { //a describe block which contains numbers of it blocks
    it('should greet the given name', function() { 
        expect(greet('Joe')).toEqual('Hello Joe!');
    });
    it('should greet no-one special if no name is given', function() { 
        expect(greet()).toEqual('Hello world!');
    });
});