# NFC SUN (Secure Unique NFC) Validation

_Validate the authenticity of a request by using NFC tags._

[NTAG 424 DNA](https://www.nxp.com/docs/en/brochure/NTAG424_BROCHURE.pdf) NFC
Tags perform encryption on board to create a non-forgeable unique URL. The URL
contains an AES CMAC (Cipher-based Message Authentication Code) which is used to
validate the authenticity of the request.

For more information regarding **SUN**, refer to these websites/documents:
- [NTAG 424 DNA and NTAG 424 DNA TagTamper features and hints](https://www.nxp.com/docs/en/application-note/AN12196.pdf)
- [NTAG 424 DNA - Secure NFC T4T compliant IC](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf)
- [Integrating NTAG® 424 DNA with a web application](https://nfcdeveloper.com/blog/2022/01/06/integrating-ntag424-dna-tags-with-a-web-application.html)
- https://github.com/icedevml/sdm-backend/tree/master
- [NXP Forum on validating CMAC](https://community.nxp.com/t5/NFC/How-to-verify-the-CMAC-myself/m-p/1046998#M7035)

## Equipment

| Item                  | Description                                                                                                                             | Link                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| NTAG 424 DNA          | NFC tag                                                                                                                                 | [Shop NFC](https://www.shopnfc.com/en/nfc-tags-in-pvc/500-circus-flex-pro-ntag424-dna.html) |
| Identiv uTrust 3700 F | NFC reader                                                                                                                              | [Amazon](https://www.amazon.com/gp/product/B07BZ5GCT5)                                      |
| NXP TagXplorer        | Free NFC Software<br/>Alternatively, you might be able to use the NXP TagWriter app on Android (iPhone version seem to be more limited) | [NXP](https://www.nxp.com/design/software/tagxplorer/tagxplorer:TAGXPLORER)                 |

## Encoding Tags
1. Open NXP TagXplorer (may need to link JavaXF module)
2. Connect to Reader
3. Connect to Tag
4. Choose NTAG Operations
5. Choose Mirroring Features
6. Choose NTAG 424 DNA
7. Choose Protocol (e.g. `https://`)
8. Type in URI (e.g. `nfc.garytou.dev`)
9. Select `Add Tag UID`
10. Select `Add Interaction Counter`
11. Select `Enable SUN Message`
12. Modify the placeholders to match URL query params (.e.g `?uid=00000000000000&ctr=000000&cmac=0000000000000000`)
13. Please the cursor in URI data field where mirroring needs to be enabled (Mirroring replaces the `000` placeholders with the UID, Counter, and CMAC). Record the Offset Values for UID, Counter, and SUN (CMAC).
14. Write to tag
15. Pesss "OK"
16. Choose NTAG 424 DNA (top navigation)
17. Select NDEF Application
18. Press "Select"
19. Press "Get/Change File Settings"
20. Press "OK"
21. Press "Security Management"
22. Enter Key (default key: `00000000000000000000000000000000`, 32 zeros)
23. Press "Authenticate First"
24. Set SDM Meta Read Access Key to `0E` (everyone can read)
25. Set SDM Counter Ret Access Key to `0E`
26. Enter previously recorded Offset Values for UID, SDM Read Counter, and SDM MAC Input (SUN/CMAC)
27. Set SDM MAC Offset to the same as SDM MAC Input Offset
28. Press "Change File Settings"
29. Press "OK"
30. Press "Disconnect Tag
31. Press "Disconnect Reader"
32. Press "Connect Reader"
33. Press "Connect Tag"
34. Press "NDEF Operations"
35. Press "Read NDEF"

You should now see a valid SUN URL. Also test with iPhone (scan NFC tag).
