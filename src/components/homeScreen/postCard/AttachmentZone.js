import React from 'react';
import {View} from 'react-native';
import {Sizes, Spacing} from '../../../constants/theme';
import {AttachmentItem} from './AttachmentItem';

export const AttachmentsZone = ({attachments}) => {
  const len = attachments.length;

  if (len === 0) return null;

  if (len === 1) {
    return <AttachmentItem uri={attachments[0].uri} style={{padding: 0}} />;
  }

  if (len === 2) {
    return (
      <View style={{flexDirection: 'row', marginHorizontal: -Spacing.XS}}>
        <AttachmentItem uri={attachments[0].uri} />
        <AttachmentItem uri={attachments[1].uri} />
      </View>
    );
  }
  if (len === 3) {
    return (
      <View style={{width: '100%'}}>
        <AttachmentItem uri={attachments[0].uri} />
        <View style={{flexDirection: 'row', width: '100%'}}>
          <AttachmentItem
            uri={attachments[1].uri}
            style={{height: Sizes.width / 2}}
          />
          <AttachmentItem
            uri={attachments[2].uri}
            style={{height: Sizes.width / 2}}
          />
        </View>
      </View>
    );
  }
  if (len >= 4) {
    return (
      <View style={{width: '100%'}}>
        <AttachmentItem uri={attachments[0].uri} />
        <View style={{flexDirection: 'row', width: '100%'}}>
          <AttachmentItem
            uri={attachments[1].uri}
            style={{height: Sizes.width / 3}}
          />
          <AttachmentItem
            uri={attachments[2].uri}
            style={{height: Sizes.width / 3}}
          />
          <AttachmentItem
            uri={attachments[3].uri}
            style={{height: Sizes.width / 3}}
            overlayText={len > 4 ? `+${len - 3}` : null}
          />
        </View>
      </View>
    );
  }
};
