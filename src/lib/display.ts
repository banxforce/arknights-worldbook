const statusLabels: Record<string, string> = {
  draft: '待补全',
  reviewing: '待校订',
  stable: '已校订',
  deprecated: '待归档',
};

const spoilerLevelLabels: Record<string, string> = {
  none: '无剧透',
  low: '轻微剧透',
  medium: '中度剧透',
  high: '重度剧透',
};

const factionTypeLabels: Record<string, string> = {
  'medical-organization': '感染者医疗组织',
  movement: '感染者运动',
  'research-corporation': '科研机构',
  'private-logistics': '物流公司',
  'security-contractor': '安保承包商',
  'state-linked-company': '贸易公司',
};

export function displayStatus(status?: string) {
  if (!status) {
    return undefined;
  }

  return statusLabels[status] ?? status;
}

export function displaySpoilerLevel(spoilerLevel?: string) {
  if (!spoilerLevel) {
    return undefined;
  }

  return spoilerLevelLabels[spoilerLevel] ?? spoilerLevel;
}

export function displayFactionType(factionType?: string) {
  if (!factionType) {
    return undefined;
  }

  return factionTypeLabels[factionType] ?? factionType;
}
