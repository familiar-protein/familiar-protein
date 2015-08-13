var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;

// create testing database
process.env.TESTING_DB = 'mongodb://localhost/regextesting';
var app = require('../server');
var Question = require('../questions/questionModel');

//describe('Server', function() {


//});