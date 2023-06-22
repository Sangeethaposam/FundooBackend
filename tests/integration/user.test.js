import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
import HttpStatus from 'http-status-codes';

let token;
let id;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });
   //REGISTER
  describe('POST /users', () => {
    it('should return 201 and create a new user', (done) => {
    const userDetails = {
      firstname: 'ashu',
      lastname: 'reddy',
      email: 'ashu@gmail.com',
      password: 'ashu345'
    };
      request(app)
        .post('/api/v1/users')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });
  //Login
  describe('POST /users/login', () => {
    const userDetails = {
      email: 'ashu@gmail.com',
      password: 'ashu345'
    };
    it('should return 200 and token', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          token = res.body.data;
          done();
        });
    });
  });

  //Note
  describe('POST /notes', () => {
    const note = {
      title: 'Hello world..',
      description: 'Welcome to nodejs...'
    };
    it('should return 201 and create a note', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          id = res.body.data._id;
          done();
        });
    });
  });
//GET ALL NOTES
  describe('GET /notes', () => {
    it('should return 200 and return a single note', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
//GET NOTE
  describe('GET /notes/:_id', () => {
    it('should return 200 and return a note', (done) => {
      request(app)
        .get(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
//UPDATE NOTE
  describe('PUT /notes/:_id', () => {
    const note = {
      title: 'This is updated title'
    };
    it('should return 200 and update the data', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  });
//TRASH
  describe('PUT /notes/trash/:_id', () => {
    it('should return 200 and update the data trash to true', (done) => {
      request(app)
        .put(`/api/v1/notes/trash/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  });
//ARCHIVE
  describe('PUT /notes/archive/:_id', () => {
    it('should return 200 and update the data trash to false', (done) => {
      request(app)
        .put(`/api/v1/notes/archive/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  });
//DELETE
  describe('DELETE /notes/:_id', () => {
    it('should return 200 and update the data trash to false', (done) => {
      request(app)
        .delete(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
});
