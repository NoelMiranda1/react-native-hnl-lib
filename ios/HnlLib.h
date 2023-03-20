
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNHnlLibSpec.h"

@interface HnlLib : NSObject <NativeHnlLibSpec>
#else
#import <React/RCTBridgeModule.h>

@interface HnlLib : NSObject <RCTBridgeModule>
#endif

@end
