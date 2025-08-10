import { Image, Animated, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert, TextInput } from "react-native"
import { styles } from "./components/styles/computed/styles"
import { LayerShadow } from "./components/elements/LayerShadow"
import layer from "./assets/images/layercover.png"
import favicon from './assets/images/favico.png'
import { Break, Pad } from "./components/elements/Components"
import { LinearGradient } from "expo-linear-gradient"
import { Themes } from "./components/styles/computed/themes"
import solana from './assets/images/solana.png'
import ethereum from './assets/images/eth.png'
import arcium from './assets/images/arcium.jpeg'
import wallet from './assets/images/wallet.png'
import wallet2 from './assets/images/wallet2.png'
import nft from './assets/images/nft.jpeg'
import seeker from './assets/images/seeker.webp'
import { CustomViewProvider, useCustomView } from "./context/CustomViewContext"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWallet, WalletProvider } from "./context/WalletContext"
import { Modal } from "react-native"
import { useState } from "react"

export const WelcomeScreen = () => {
 const { startupItemsAnimOpacity,
privacyRecognition,
privacyRecognitionOpacity,
privacyConnectOpacity,
privacyConnectZindex,
privacyWelcomeOpacity,
privacyWelcome,
showWalletConnect,
hideWalletConnect,
removeWelcomeScreen,
showPrivacyRecognition,
hidePrivacyRecognition } = useCustomView();

 const { createWallet, importWallet } = useWallet();
 const [generatedMnemonic, setGeneratedMnemonic] = useState<string[]>([]);
 const [isCreating, setIsCreating] = useState(false);
 const [showOptions, setShowOptions] = useState(false);
 const [showMnemonic, setShowMnemonic] = useState(false);
 const [showImport, setShowImport] = useState(false);
 const [mnemonicInput, setMnemonicInput] = useState('');
 const [isImporting, setIsImporting] = useState(false);

 const handleCreateWallet = async () => {
 try {
 setIsCreating(true);
 const mnemonic = await createWallet();
 setGeneratedMnemonic(mnemonic);
 setShowMnemonic(true);
 } catch (error) {
 Alert.alert('Error', 'Failed to create wallet. Please try again.');
 console.error('Wallet creation error:', error);
 } finally {
 setIsCreating(false);
 }
 };

 const handleImportWallet = async () => {
 try {
 setIsImporting(true);
 
 // Validate mnemonic input
 const mnemonicArray = mnemonicInput.trim().toLowerCase().split(/\s+/);
 
 if (mnemonicArray.length !== 12) {
 Alert.alert('Invalid Seed Phrase', 'Please enter exactly 12 words.');
 return;
 }

 await importWallet(mnemonicArray);
 Alert.alert(
 'Wallet Imported Successfully!',
 'Your wallet has been imported and is ready to use.',
 [{ text: 'OK', onPress: () => {setShowImport(false); removeWelcomeScreen()} }]
 );
 setMnemonicInput('');
 } catch (error) {
 Alert.alert('Import Failed', 'Invalid seed phrase. Please check and try again.');
 console.error('Wallet import error:', error);
 } finally {
 setIsImporting(false);
 }
 };

 const validateMnemonic = (text: string): boolean => {
 const words = text.trim().split(/\s+/);
 return words.length === 12 && words.every(word => word.length > 0);
 };
 return (
 <WalletProvider>
 <CustomViewProvider>
 <Animated.View style={[styles.layout,{zIndex:privacyWelcome,opacity:privacyWelcomeOpacity}]}>
 <Pad align="flex-start" justify="flex-start" style={[styles.sizeFull,{zIndex:999}]}>
 <LayerShadow fill={layer}/>
 <LinearGradient colors={['#00000000', '#00000010', '#000000a0', '#000000f5']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.sizeFull,{zIndex:9}]}/>
 <Break py={20}/>
 <Pad align="flex-start" justify="flex-start" px={20} style={styles.wFull}>
 <Pad direction="row" align="center" justify="center" style={styles.center} gap={5}>
 <Image source={favicon} style={{width:20,height:20,transform:[{rotate:'-15deg'}]}}/>
 <Text style={{fontFamily:'Font-Bold',fontSize:15,color:Themes.color.white}}>Breeze &trade;</Text>
 </Pad>
 <Break py={5}/>
 <View style={styles.center}>
 <Break py={270}/>
 <Animated.View style={[styles.absolute,styles.wFull,{opacity:startupItemsAnimOpacity}]}>
 <View style={[styles.center]}>
 <View style={[types.radalObject,types.radalWallet]}>
 <Image source={wallet} style={{width:'115%',height:'115%'}}/>
 </View>
 </View>
 <View style={[styles.center]}>
 <View style={[types.radalObject,types.radalNft]}>
 <Image source={nft} style={{width:'100%',height:'100%'}}/>
 </View>
 </View>
 <View style={[styles.center]}>
 <View style={[types.radalObject,types.radalSeeker]}>
 <Image source={seeker} style={{width:'100%',height:'100%'}}/>
 </View>
 </View>
 <View style={[styles.center]}>
 <View style={[types.radalObject,types.radalArcium]}>
 <Image source={arcium} style={{width:'100%',height:'100%'}}/>
 </View>
 </View>
 <Pad direction="row">
 <View style={[styles.wHalf]}>
 <View style={[types.radalObject,types.radalSol]}>
 <Image source={solana} style={{width:'55%',height:'55%'}}/>
 </View>
 </View>
 <View style={[styles.wHalf,styles.alignEnd]}>
 <View style={[types.radalObject,types.radalEth]}>
 <Image source={ethereum} style={{width:'60%',height:'60%'}}/>
 </View>
 </View>
 </Pad>
 </Animated.View>
 <View style={[types.radalBorder,{width:650,height:650}]}>
 <View style={[types.radalBorder,{width:500,height:500}]}>
 <View style={[types.radalBorder,{width:370,height:370}]}>
 <View style={[types.radalBorder,{width:240,height:240}]}>
 <Animated.View style={[styles.center,{position:'absolute',zIndex:999,opacity:startupItemsAnimOpacity}]}>
 <Image source={favicon} style={{width:150,height:150}}/>
 </Animated.View>
 </View>
 </View>
 </View>
 </View>
 </View>
 </Pad>
 </Pad>
 <Animated.View style={[styles.wFull,{transform:[{translateY:-140}],zIndex:99999,height:200,position:'absolute',bottom:0,paddingHorizontal:20,opacity:startupItemsAnimOpacity}]}>
 <View style={styles.align}>
 <View style={{transform:[{translateY:-4}],width:'90%'}}>
 <Text style={{fontFamily:'Font-Bold',fontSize:28,color:Themes.color.white,textAlign:'center',lineHeight:43}}>
 Your Gateway to Private Browsing and everything to do with <Text style={{fontFamily:'Font-Pixel',transform:[{scaleX:.7}]}}>Crypto</Text>
 </Text>
 </View>
 </View>
 <Break py={25}/>
 <Pad direction="row" align="center" gap={7}>
 <View style={[types.pageBullets,types.pageBulletsActive]}/>
 <View style={[types.pageBullets,types.pageBulletsInActive]}/>
 <View style={[types.pageBullets,types.pageBulletsInActive]}/>
 <View style={[types.pageBullets,types.pageBulletsInActive]}/>
 <View style={[types.pageBullets,types.pageBulletsInActive]}/>
 <View style={[types.pageBullets,types.pageBulletsInActive]}/>
 </Pad>
 <Break py={15}/>
 <Pad direction="column" align="flex-start" px={10}>
 <TouchableOpacity activeOpacity={.5} style={{overflow:'hidden',borderRadius:100,width:'100%',height:50}} onPress={showPrivacyRecognition}>
 <LinearGradient colors={['#0047baff', '#3900beff', '#7900b9ff']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[{width:'100%',height:'100%'}]}/>
 <View style={types.forwardAction}>
 <Text style={{color:'#ffffff',fontFamily: 'Font-Bold',fontSize:15}}>Continue to setup</Text>
 </View>
 </TouchableOpacity>
 <Break py={3}/>
 <TouchableOpacity activeOpacity={.5} style={{overflow:'hidden',borderRadius:100,width:'100%',height:50}}>
 <View style={types.forwardAction}>
 <Text style={{color:'#ffffff90',fontFamily: 'Font-Regular',fontSize:15}}>Remind me to setup later</Text>
 </View>
 </TouchableOpacity>
 </Pad>
 </Animated.View>
 <Animated.View style={[styles.sizeFull,styles.align,{zIndex:privacyRecognition,opacity:privacyRecognitionOpacity ,paddingHorizontal:20}]}>
 <Break py={60}/>
 <Image source={favicon} style={{width:50,height:50}}/>
 <Text style={{fontFamily:'Font-Bold',color:Themes.color.white,fontSize:26}}>Privacy Recognition</Text>
 <Break py={7}/>
 <View style={types.privacyRec}>
 {/* <Blury height={'100%'} intensity={7} parentRadius={0} bottom={0} radius={20}/> */}
 <ScrollView style={{width:'100%',maxHeight:'100%',paddingHorizontal:15,paddingVertical:10}} showsVerticalScrollIndicator={false}>
 <Text style={{color:Themes.color.white,fontSize:15,fontFamily:'Font-Regular',lineHeight:22}}>
 At Breeze, your privacy isn’t just a feature it’s your asset.
 {/* <Break py={15}/> */}
 <Text>
 We’re building the future of the internet where your data belongs to you, not to big tech, trackers, or advertisers. As a decentralized Web3 dApp, Breeze is designed to empower you with true digital freedom through secure, anonymous browsing and seamless crypto payments — all without ever compromising your privacy.

 Our Privacy Philosophy
From the first line of code, Breeze was developed with a user-first mindset — where your identity, activity, and assets stay under your complete control.
We believe:

Your data is your property, not ours.
Privacy is a right, not a feature.
Freedom online means freedom from surveillance, censorship, and data exploitation.
 What Makes Breeze Private by Design?
 Zero Tracking — Always
Breeze does not log, track, or monitor your browsing activity.
We don’t collect cookies, fingerprints, or analytics that could identify or profile you.
We never sell, rent, or share data — because we never collect it in the first place.
 Secure Wallet, Secure Identity
Your crypto wallet is created and encrypted locally on your device.
Only you have access to your private keys — not us, not anyone else.
Wallet data is never uploaded, synced, or stored remotely unless you explicitly choose to back it up securely.
 No Accounts, No Emails, No KYC
Breeze does not require you to sign up, provide an email, or verify your identity.
We believe that access to Web3 and financial freedom should be permissionless and anonymous.
 Advanced Technical Protections
End-to-End Encryption: All sensitive actions — from browsing sessions to crypto transactions — are secured with military-grade encryption protocols.
Local Signing: Transactions are signed locally before being sent to the blockchain, ensuring no external party can intercept or manipulate them.
Open-Source Ethos (if applicable): Transparency matters. Wherever possible, Breeze embraces open-source development so the community can audit and verify our privacy claims.
 Full Data Ownership & Control
You can view, export, or delete any local data associated with your Breeze usage.
When you delete your wallet or clear your data, it’s completely wiped — we retain nothing.
You’re free to move your wallet or data wherever you choose — no lock-ins or hidden syncing.
 Built for Peace of Mind
With Breeze, you're not just using a tool — you're reclaiming agency over your online experience. Whether you’re browsing freely or making crypto payments, you do so without compromise, risk, or surveillance.
 Trustless by Design, Trusted by Principle
We don’t ask you to trust us with your data — because we’ve built Breeze so that you don’t have to. That’s the power of trustless technology: when systems respect your privacy by default, you don’t need blind faith.
Breeze is more than a browser — it's your shield in the new internet.
Private. Secure. Decentralized. Yours.
 </Text>
 </Text>
 <Break py={15}/>
 </ScrollView>
 </View>
 <Break py={10}/>
 <TouchableOpacity activeOpacity={.5} style={{overflow:'hidden',borderRadius:100,width:'100%',height:50}} onPress={showWalletConnect}>
 <LinearGradient colors={['#0047baff', '#3900beff', '#7900b9ff']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[{width:'100%',height:'100%'}]}/>
 <View style={types.forwardAction}>
 <Text style={{color:'#ffffff',fontFamily: 'Font-Bold',fontSize:15}}>I understand and want to continue</Text>
 </View>
 </TouchableOpacity>
 <TouchableOpacity activeOpacity={.5} style={{overflow:'hidden',borderRadius:100,width:'100%',height:50}} onPress={hidePrivacyRecognition}>
 <View style={types.forwardAction}>
 <Text style={{color:'#ffffff',fontFamily: 'Font-Bold',fontSize:15,opacity:.7}}>cancel and go back</Text>
 </View>
 </TouchableOpacity>
 </Animated.View>

 <Animated.View style={[styles.sizeFull,styles.align,{zIndex:privacyConnectZindex,opacity:privacyConnectOpacity,paddingHorizontal:20}]}>
 <Break py={60}/>
 <View style={[styles.align, styles.wFull]}>
 <Break py={60} />
 <View style={{ filter: [{ contrast: 1.4 }, { brightness: 1.4 }, { saturate: .9 }] }}>
 <Image source={wallet2} style={{ width: 250, height: 250, zIndex: 999 }} />
 </View>
 <Break py={10} />
 <Text style={{ textAlign: 'center', fontFamily: 'Font-Bold', color: '#ffffff', fontSize: 30 }}>Create a Wallet</Text>
 <View style={{ width: '85%' }}>
 <Text style={{ textAlign: 'center', fontFamily: 'Font-Regular', color: '#ffffff90', fontSize: 16, lineHeight: 22 }}>
 Get yourself a decentralised wallet and start making transactions online with crypto assets, all hassle free
 </Text>
 </View>
 <Break py={40} />
 <View style={[styles.wFull]}>
 <TouchableOpacity 
 activeOpacity={.5} 
 style={{ overflow: 'hidden', borderRadius: 100, width: '100%', height: 50 }}
 onPress={() => setShowOptions(true)}
 >
 <LinearGradient 
 colors={['#0047baff', '#3900beff', '#7900b9ff']}
 start={{ x: 0, y: 0 }} 
 end={{ x: 1, y: 0 }} 
 style={[{ width: '100%', height: '100%', zIndex: -999, position: 'absolute' }]} 
 />
 <View style={types.forwardAction}>
 <Text style={{ color: '#ffffff', fontFamily: 'Font-Bold', fontSize: 15 }}>Continue</Text>
 </View>
 </TouchableOpacity>
 <Break py={5} />
 <TouchableOpacity activeOpacity={.5} style={{ overflow: 'hidden', borderRadius: 100, width: '100%', height: 50 }} onPress={hideWalletConnect}>
 <View style={types.forwardAction}>
 <Text style={{ color: '#ffffff95', fontFamily: 'Font-Bold', fontSize: 15 }}>cancel</Text>
 </View>
 </TouchableOpacity>
 </View>

 {/* Wallet Options Modal */}
 <Modal
 visible={showOptions}
 transparent={true}
 animationType="fade"
 onRequestClose={() => setShowOptions(false)}
 >
 <View style={types.modalOverlay}>
 <View style={types.modalContent}>
 <Text style={types.modalTitle}>Choose an Option</Text>
 
 <TouchableOpacity 
 style={types.modalButton}
 onPress={() => {
 setShowOptions(false);
 handleCreateWallet();
 }}
 disabled={isCreating}
 >
 <LinearGradient 
 colors={['#0047baff', '#3900beff', '#7900b9ff']}
 start={{ x: 0, y: 0 }} 
 end={{ x: 1, y: 0 }} 
 style={types.buttonGradient} 
 />
 <Text style={types.buttonText}>
 {isCreating ? 'Creating...' : 'Create New Wallet'}
 </Text>
 </TouchableOpacity>

 <TouchableOpacity 
 style={[types.modalButton, { backgroundColor: '#333' }]}
 onPress={() => {
 setShowOptions(false);
 setShowImport(true);
 }}
 >
 <Text style={types.buttonText}>Import Existing Wallet</Text>
 </TouchableOpacity>

 <TouchableOpacity 
 style={types.cancelButton}
 onPress={() => {setShowOptions(false)}}
 >
 <Text style={types.cancelText}>Cancel</Text>
 </TouchableOpacity>
 </View>
 </View>
 </Modal>

 {/* Mnemonic Display Modal */}
 <Modal
 visible={showMnemonic}
 transparent={true}
 animationType="fade"
 onRequestClose={() => setShowMnemonic(false)}
 >
 <View style={types.modalOverlay}>
 <View style={types.modalContent}>
 <Text style={types.modalTitle}>Your Seed Phrase</Text>
 <Text style={types.warningText}>
 ⚠️ Save these words securely! You'll need them to recover your wallet.
 </Text>
 
 <ScrollView style={types.mnemonicContainer}>
  <View style={types.mnemonicGrid}>
 {generatedMnemonic.map((word, index) => (
 <View key={index} style={types.mnemonicItem}>
 <Text style={types.mnemonicNumber}>{index + 1}</Text>
 <Text style={types.mnemonicWord}>{word}</Text>
 </View>
 ))}
 </View>
 </ScrollView>

 <TouchableOpacity 
 style={types.modalButton}
 onPress={() => {
 Alert.alert(
 'Seed Phrase Saved?',
 'Have you securely saved your 12-word seed phrase? You will need it to recover your wallet.',
 [
 { text: 'Not Yet', style: 'cancel' },
 { 
 text: 'Yes, I Saved It', 
 onPress: () => {
 setShowMnemonic(false);
 setGeneratedMnemonic([]);
 removeWelcomeScreen();
 }
 }
 ]
 );
 }}
 >
 <LinearGradient 
 colors={['#0047baff', '#3900beff', '#7900b9ff']}
 start={{ x: 0, y: 0 }} 
 end={{ x: 1, y: 0 }} 
 style={types.buttonGradient} 
 />
 <Text style={types.buttonText}>I've Saved My Seed Phrase</Text>
 </TouchableOpacity>
 </View>
 </View>
 </Modal>

 {/* Import Wallet Modal */}
 <Modal
 visible={showImport}
 transparent={true}
 animationType="fade"
 onRequestClose={() => setShowImport(false)}
 >
 <View style={types.modalOverlay}>
 <View style={types.modalContent}>
 <Text style={types.modalTitle}>Import Wallet</Text>
 <Text style={types.instructionText}>
 Enter your 12-word seed phrase to import your existing wallet:
 </Text>
 
 <TextInput
 style={types.mnemonicInput}
 value={mnemonicInput}
 onChangeText={setMnemonicInput}
 placeholder="Enter your 12-word seed phrase separated by spaces"
 placeholderTextColor="#666"
 multiline
 numberOfLines={4}
 textAlignVertical="top"/>

 <TouchableOpacity 
 style={[
 types.modalButton, 
 { opacity: validateMnemonic(mnemonicInput) ? 1 : 0.5 }
 ]}
 onPress={handleImportWallet}
 disabled={isImporting || !validateMnemonic(mnemonicInput)}>
 <LinearGradient 
 colors={['#0047baff', '#3900beff', '#7900b9ff']}
 start={{ x: 0, y: 0 }} 
 end={{ x: 1, y: 0 }} 
 style={types.buttonGradient} />
 <Text style={types.buttonText}>
 {isImporting ? 'Importing...' : 'Import Wallet'}
 </Text>
 </TouchableOpacity>

 <TouchableOpacity 
 style={types.cancelButton}
 onPress={() => {
 setShowImport(false);
 setMnemonicInput('');
 }}
 >
 <Text style={types.cancelText}>Cancel</Text>
 </TouchableOpacity>
 </View>
 </View>
 </Modal>
 </View>
 </Animated.View>
 </Animated.View>
 </CustomViewProvider>
 </WalletProvider>
 )
}

const types = StyleSheet.create({
 radalBorder: {
 borderRadius: 1000,
 borderWidth: 1.2,
 position: 'absolute',
 borderColor: '#e0f4ff38',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center'
 },
 radalObject: {
 width: 60,
 height: 60,
 borderRadius: 100,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 overflow: 'hidden',
 position: 'absolute',
 backgroundColor: '#ffffff'
 },
 radalSol: {
 transform: [{translateX:-10},{translateY:-10}],
 backgroundColor: '#070a1a',
 },
 radalEth: {
 transform: [{translateX:10},{translateY:-40}],
 backgroundColor: '#ffffff',
 },
 radalArcium: {
 transform: [{translateY:-125}],
 backgroundColor: '#ffffff',
 },
 radalWallet: {
 transform: [{translateY:-155},{translateX:130}],
 },
 radalNft: {
 transform: [{translateY:-170},{translateX:-150}],
 },
 radalSeeker: {
 transform: [{translateY:-230},{translateX:-13}],
 },
 pageBullets: {
 height: 9,
 borderRadius: 100,
 },
 pageBulletsActive: {
 width: 20,
 backgroundColor: Themes.color.white
 },
 pageBulletsInActive: {
 width: 9,
 backgroundColor: '#ffffff30',
 },
 forwardAction: {
 zIndex: 99,
 width: '100%',
 height: '100%',
 display: 'flex',
 position: 'absolute',
 alignItems: 'center',
 justifyContent: 'center',
 },
 privacyRec: {
 width: '100%',
 height: 480,
 backgroundColor: '#ffffff28',
 borderWidth: 1.5,
 borderColor: '#ffffff30',
 borderRadius: 20,
 overflow: 'hidden'
 },
 modalOverlay: {
 backgroundColor: '#00000082',
 justifyContent: 'center',
 alignItems: 'center',
 paddingHorizontal: 20,
 position:'absolute',
 height: '100%',
 width: '100%',
 left: 0,
 top: 0
 },
 modalContent: {
 backgroundColor: '#1a1a1a',
 borderRadius: 25,
 paddingHorizontal: 25,
 paddingVertical: 15,
 width: '100%',
 maxWidth: 400,
 maxHeight: '80%',
 },
 modalTitle: {
 fontSize: 24,
 fontFamily: 'Font-Bold',
 color: '#ffffff',
 textAlign: 'center',
 marginBottom: 20,
 },
 modalButton: {
 borderRadius: 25,
 height: 50,
 marginVertical: 8,
 overflow: 'hidden',
 position: 'relative',
 },
 buttonGradient: {
 position: 'absolute',
 width: '100%',
 height: '100%',
 },
 buttonText: {
 color: '#ffffff',
 fontFamily: 'Font-Bold',
 fontSize: 16,
 textAlign: 'center',
 lineHeight: 50,
 zIndex: 1,
 },
 cancelButton: {
 borderRadius: 25,
 height: 50,

 justifyContent: 'center',
 alignItems: 'center',
 },
 cancelText: {
 color: '#ffffff95',
 fontFamily: 'Font-Bold',
 fontSize: 16,
 },
 warningText: {
 color: '#ff6b6b',
 fontFamily: 'Font-Regular',
 fontSize: 14,
 textAlign: 'center',
 marginBottom: 20,
 lineHeight: 20,
 },
 instructionText: {
 color: '#ffffff90',
 fontFamily: 'Font-Regular',
 fontSize: 14,
 textAlign: 'center',
 marginBottom: 20,
 lineHeight: 20,
 },
 mnemonicContainer: {
 maxHeight: 300,
 marginBottom: 20,
 },
 mnemonicGrid: {
 flexDirection: 'row',
 flexWrap: 'wrap',
 justifyContent: 'space-between',
 },
 mnemonicItem: {
 width: '48%',
 backgroundColor: '#333',
 borderRadius: 8,
 padding: 12,
 marginBottom: 8,
 flexDirection: 'row',
 alignItems: 'center',
 },
 mnemonicNumber: {
 color: '#666',
 fontFamily: 'Font-Regular',
 fontSize: 12,
 marginRight: 8,
 minWidth: 20,
 },
 mnemonicWord: {
 color: '#ffffff',
 fontFamily: 'Font-Bold',
 fontSize: 14,
 flex: 1,
 },
 mnemonicInput: {
 backgroundColor: '#333',
 borderRadius: 12,
 padding: 15,
 color: '#ffffff',
 fontFamily: 'Font-Regular',
 fontSize: 16,
 marginBottom: 20,
 minHeight: 100,
 textAlignVertical: 'top',
 },
})