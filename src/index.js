const { port, env } = require('./constants');
const app = require('./config/express.config');
const logger = require('./utils/logger')(__filename);
const CourseController = require('../src/api/Course/course.controllers');


// listen to requests
app.listen(port, (err) => {
	if (err) {
		return logger.error('server failed to start ', err);
	}
	require('./config/mongo.config');
// please comment below line setTimeout for duplicate data cretion
	// setTimeout(()=>{
	// 	CourseController.saveSubject();
	// },3000);
	return logger.info(`server started [env, port] = [${env}, ${port}]`);
});

/**
 * Exports express
 * @public
 */
module.exports = app;
