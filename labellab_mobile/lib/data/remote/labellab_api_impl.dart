import 'package:dio/dio.dart';
import 'package:labellab_mobile/data/remote/dto/login_response.dart';
import 'package:labellab_mobile/data/remote/dto/register_response.dart';
import 'package:labellab_mobile/data/remote/labellab_api.dart';
import 'package:labellab_mobile/model/auth_user.dart';
import 'package:labellab_mobile/model/user.dart';

class LabelLabAPIImpl extends LabelLabAPI {
  Dio _dio;

  LabelLabAPIImpl(): _dio = Dio();

  /// BASE_URL - Change according to current labellab server
  static const String BASE_URL = "https://labellab-server.herokuapp.com/api/v1/";

  // Endpoints
  static const ENDPOINT_LOGIN = "auth/login";
  static const ENDPOINT_REGISTER = "auth/register";
  
  @override
  Future<LoginResponse> login(AuthUser user) {
    return _dio.post(BASE_URL + ENDPOINT_LOGIN, data: user.toMap()).then((response) {
      return LoginResponse(response.data);
    });
  }

  @override
  Future<RegisterResponse> register(User user) {
    return _dio.post(BASE_URL + ENDPOINT_REGISTER, data: user.toMap()).then((response) {
      return RegisterResponse(response.data);
    });
  }

  
}