const jsonClient = require('./jsonClient');

const stubRequest = (statusCode, fakeError, fakeData) =>
    ({ get: (opt, cb) => cb(fakeError, {statusCode}, fakeData) });

describe('jsonClient', () => {

    describe('configure', () => {
        it('should be callable', () => {
            expect(typeof jsonClient.configure).toBe('function');
        })
    });

    describe('getJSON', () => {

        it('should be callable', () => {
            expect(typeof jsonClient.configure).toBe('function');
        });

        it('should resolve on 200 http response', () => {

            const fakeData = '{ "data": "fake" }';
            const expectedResponse = { "data": "fake" };
            const fakeReq = stubRequest(200, null, fakeData);
            const fakeUrl = 'dummyUrl';
            jsonClient.configure(fakeReq);

            const response = jsonClient.getJSON(fakeUrl);

            return expect(response).resolves.toEqual(expectedResponse);
        });

        it('should reject on non-200 http response', () => {
            const fakeErr = 'fake error';
            const fakeReq = stubRequest(500, fakeErr, null);
            const fakeUrl = 'dummyUrl';
            jsonClient.configure(fakeReq);

            const response = jsonClient.getJSON(fakeUrl);

            return expect(response).rejects.toBe(fakeErr);
        });

        it('should reject when res is not valid JSON', () => {
            const invalidJSON = 'Not valid JSON';
            const fakeReq = stubRequest(200, invalidJSON , null);
            const fakeUrl = 'dummyUrl';
            jsonClient.configure(fakeReq);

            const response = jsonClient.getJSON(fakeUrl);

            return expect(response).rejects.toMatch(invalidJSON);
        });
    });

});
