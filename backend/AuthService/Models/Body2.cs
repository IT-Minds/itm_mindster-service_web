namespace AuthService.Models
{
  [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.3.1.0 (Newtonsoft.Json v12.0.0.0)")]
  public partial class Body2
  {
    public string TokenIdentifier { get; set; }

    public Services Services { get; set; }

    private System.Collections.Generic.IDictionary<string, object> _additionalProperties = new System.Collections.Generic.Dictionary<string, object>();

    public System.Collections.Generic.IDictionary<string, object> AdditionalProperties
    {
      get { return _additionalProperties; }
      set { _additionalProperties = value; }
    }
  }
}
