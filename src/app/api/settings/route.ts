import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/settings
 * Return all site settings as a key-value map.
 */
export async function GET() {
  try {
    const settings = await db.siteSetting.findMany();

    // Convert array to key-value map for easier consumption
    const settingsMap: Record<string, string> = {};
    for (const setting of settings) {
      settingsMap[setting.key] = setting.value;
    }

    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings
 * Update site settings.
 * Accepts an array of { key, value } objects.
 * Creates settings that don't exist yet.
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { settings } = body;

    if (!Array.isArray(settings)) {
      return NextResponse.json(
        { error: 'Expected "settings" array with { key, value } objects' },
        { status: 400 }
      );
    }

    // Validate each setting has key and value
    for (const setting of settings) {
      if (!setting.key || typeof setting.key !== 'string') {
        return NextResponse.json(
          { error: 'Each setting must have a "key" string' },
          { status: 400 }
        );
      }
    }

    // Upsert each setting
    const results = await Promise.all(
      settings.map((setting: { key: string; value: string }) =>
        db.siteSetting.upsert({
          where: { key: setting.key },
          update: { value: setting.value || '' },
          create: { key: setting.key, value: setting.value || '' },
        })
      )
    );

    // Return updated key-value map
    const settingsMap: Record<string, string> = {};
    for (const setting of results) {
      settingsMap[setting.key] = setting.value;
    }

    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
