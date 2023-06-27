import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.body.createdBy = user.id;
    next();
  } catch (error) {
    next(error);
  }
};

export const resetAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const user = await jwt.verify(bearerToken, process.env.RESET_KEY);
    req.body.createdBy = user.id;
    next();
  } catch (error) {
    next(error);
  }
};

// export const getNotesFromRedis = async (req, res, next) => {
//     const data = await clientRedis.get(req.body.createdBy);
//     if(data){
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: JSON.sprinify(data),
//       message: 'All notes fetched successfully'
//     });
//   } else{
//     next();
//   }
// };
