// Replaces a photo's background with white using macOS Vision subject
// segmentation (VNGenerateForegroundInstanceMaskRequest), then CIBlendWithMask.
//
//   osascript -l JavaScript scripts/cutout-bg.js in.jpg out.png
//
// Used for portraits shot on a dark backdrop, where the roster is otherwise
// shot light. A luminance threshold cannot do this: dark hair and heavily
// tattooed arms sit at the same brightness as the backdrop and get eaten.
// Needs no install — swiftc is broken on this machine, PyObjC is absent, but
// JXA bridges to Vision out of the box.

ObjC.import('Foundation');
ObjC.import('Vision');
ObjC.import('CoreImage');
ObjC.import('AppKit');

function run(argv) {
  var inPath = argv[0], outPath = argv[1];
  var img = $.CIImage.imageWithContentsOfURL($.NSURL.fileURLWithPath(inPath));
  if (!img || img.isNil()) { console.log('HATA: okunamadi'); return; }

  var req = $.VNGenerateForegroundInstanceMaskRequest.alloc.init;
  var handler = $.VNImageRequestHandler.alloc.initWithCIImageOptions(img, $());
  var err = Ref();
  handler.performRequestsError($.NSArray.arrayWithObject(req), err);

  var results = req.results;
  if (!results || results.isNil() || results.count === 0) { console.log('HATA: ozne bulunamadi'); return; }
  var r = results.objectAtIndex(0);

  var err2 = Ref();
  var maskBuf = r.generateScaledMaskForImageForInstancesFromRequestHandlerError(r.allInstances, handler, err2);
  if (!maskBuf) { console.log('HATA: maske uretilemedi'); return; }
  var mask = $.CIImage.imageWithCVPixelBuffer(maskBuf);

  var white = $.CIImage.imageWithColor($.CIColor.colorWithRedGreenBlueAlpha(1, 1, 1, 1))
                       .imageByCroppingToRect(img.extent);

  var f = $.CIFilter.filterWithName('CIBlendWithMask');
  f.setDefaults;
  f.setValueForKey(img, 'inputImage');
  f.setValueForKey(white, 'inputBackgroundImage');
  f.setValueForKey(mask, 'inputMaskImage');
  var out = f.outputImage;
  if (!out || out.isNil()) { console.log('HATA: birlestirilemedi'); return; }

  var rep = $.NSCIImageRep.imageRepWithCIImage(out);
  var nsimg = $.NSImage.alloc.initWithSize(rep.size);
  nsimg.addRepresentation(rep);
  var bmp = $.NSBitmapImageRep.imageRepWithData(nsimg.TIFFRepresentation);
  var png = bmp.representationUsingTypeProperties($.NSBitmapImageFileTypePNG, $());
  png.writeToFileAtomically($(outPath), true);
  console.log('OK  ozne sayisi=' + r.allInstances.count + '  boyut=' + rep.size.width + 'x' + rep.size.height);
}
