public class VFAppExController {
    public String renaultParameters {
            get{
                return getParams();
            }
        }
        
        
        public String getParams() {
            JSONGenerator jsonGenerate = JSON.createGenerator(true);
            jsonGenerate.writeStartObject();
            String jsonString;
            
            jsonGenerate.writeObjectField('UserId', UserInfo.getUserId());  
            jsonGenerate.writeObjectField('BIR', '7600108');  
            
            jsonGenerate.writeEndObject();
            return jsonGenerate.getAsString();
            
        }
    }