import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class TransactionScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:'clicked',
            scanned:false
        })
    }
    handleBarcodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState==='clicked'&&hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            )
            
        }
        else if(buttonState==='normal'){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.displayText}>
                        {hasCameraPermissions===true?this.state.scannedData:"Request Camera Permission"}
                    </Text>
                    <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions}>
                        <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        
    }
}
const styles = StyleSheet.create({
    scanButton:{
        backgroundColor:'purple',
        padding:10,
        margin:10,
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline',
    },
    buttonText:{
        fontSize:20
    }
})