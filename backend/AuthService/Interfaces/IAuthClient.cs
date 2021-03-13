using AuthService.Models;

namespace AuthService.Interfaces
{
  [System.CodeDom.Compiler.GeneratedCode("NSwag", "13.9.4.0 (NJsonSchema v10.3.1.0 (Newtonsoft.Json v12.0.0.0))")]
  public partial interface IAuthClient
  {
    string BaseUrl { get; set; }


    /// <summary>Create a new application</summary>
    /// <param name="body">Unique Name of the new App</param>
    /// <returns>OK</returns>
    /// <exception cref="ApiException">A server side error occurred.</exception>
    System.Threading.Tasks.Task<Response> AppAsync(Body body);

    /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <summary>Create a new application</summary>
    /// <param name="body">Unique Name of the new App</param>
    /// <returns>OK</returns>
    /// <exception cref="ApiException">A server side error occurred.</exception>
    System.Threading.Tasks.Task<Response> AppAsync(Body body, System.Threading.CancellationToken cancellationToken);

    /// <summary>Get the application public key</summary>
    /// <param name="aid">ID of the app that we want to match</param>
    /// <returns>OK</returns>
    /// <exception cref="ApiException">A server side error occurred.</exception>
    System.Threading.Tasks.Task<string> PublickeyAsync(string aid);

    /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <summary>Get the application public key</summary>
    /// <param name="aid">ID of the app that we want to match</param>
    /// <returns>OK</returns>
    /// <exception cref="ApiException">A server side error occurred.</exception>
    System.Threading.Tasks.Task<string> PublickeyAsync(string aid, System.Threading.CancellationToken cancellationToken);

    /// <summary>Create a new token for the application</summary>
    /// <param name="aid">ID of the app that we want to match</param>
    /// <param name="x_token">APP_SECRET</param>
    /// <param name="body">Cat Object</param>
    /// <returns>OK</returns>
    /// <exception cref="ApiException">A server side error occurred.</exception>
    System.Threading.Tasks.Task<Response2> TokenAsync(string aid, string x_token, Body2 body);

    /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <summary>Create a new token for the application</summary>
    /// <param name="aid">ID of the app that we want to match</param>
    /// <param name="x_token">APP_SECRET</param>
    /// <param name="body">Cat Object</param>
    /// <returns>OK</returns>
    /// <exception cref="ApiException">A server side error occurred.</exception>
    System.Threading.Tasks.Task<Response2> TokenAsync(string aid, string x_token, Body2 body, System.Threading.CancellationToken cancellationToken);

    /// <param name="aid">ID of the app that we want to match</param>
    /// <param name="tid">ID of the token that we want to match</param>
    /// <param name="x_jwt">JWT</param>
    /// <param name="x_token">APP_SECRET</param>
    /// <returns>OK</returns>
    /// <exception cref="ApiException">A server side error occurred.</exception>
    System.Threading.Tasks.Task<string> GenerateAsync(string aid, string tid, string x_jwt, string x_token);

    /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <param name="aid">ID of the app that we want to match</param>
    /// <param name="tid">ID of the token that we want to match</param>
    /// <param name="x_jwt">JWT</param>
    /// <param name="x_token">APP_SECRET</param>
    /// <returns>OK</returns>
    /// <exception cref="ApiException">A server side error occurred.</exception>
    System.Threading.Tasks.Task<string> GenerateAsync(string aid, string tid, string x_jwt, string x_token, System.Threading.CancellationToken cancellationToken);

  }
}
